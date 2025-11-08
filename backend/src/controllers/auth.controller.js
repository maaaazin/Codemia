import { supabase } from '../config/supabase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Signup
export async function signup(req, res) {
  try {
    const { email, password, name, role, roll_no, batch_id } = req.body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate role
    if (role !== 'teacher' && role !== 'student') {
      return res.status(400).json({ error: 'Invalid role. Must be teacher or student' });
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('user_id, email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        name,
        role,
        password_hash
      })
      .select('user_id, email, name, role, created_at')
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // If student, create student record
    if (role === 'student') {
      if (!roll_no) {
        return res.status(400).json({ error: 'Roll number is required for students' });
      }

      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert({
          user_id: user.user_id,
          roll_no,
          batch_id: batch_id || null
        })
        .select('student_id')
        .single();

      if (studentError) {
        console.error('Error creating student record:', studentError);
        // User was created but student record failed - we should handle this
        // For now, we'll continue but log the error
      }

      user.student_id = student?.student_id || null;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        student_id: user.student_id || null,
        instructor_id: role === 'teacher' ? user.user_id : null
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        role: user.role,
        student_id: user.student_id || null,
        instructor_id: role === 'teacher' ? user.user_id : null
      }
    });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('user_id, email, name, role, password_hash')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Get student_id if student
    let student_id = null;
    let instructor_id = null;

    if (user.role === 'student') {
      const { data: student } = await supabase
        .from('students')
        .select('student_id')
        .eq('user_id', user.user_id)
        .single();

      student_id = student?.student_id || null;
    } else if (user.role === 'teacher') {
      instructor_id = user.user_id;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        student_id,
        instructor_id
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        role: user.role,
        student_id,
        instructor_id
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get current user (protected route)
export async function getCurrentUser(req, res) {
  try {
    // User info is already in req.user from authenticateToken middleware
    const { user_id, email, role, student_id, instructor_id } = req.user;

    // Get full user details from database
    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, email, name, role, created_at')
      .eq('user_id', user_id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
      student_id,
      instructor_id
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

