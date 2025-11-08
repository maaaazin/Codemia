import { supabase } from '../config/supabase.js';

// Get all assignments
export async function getAssignments(req, res) {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        batches:batch_id (
          batch_id,
          batch_name
        ),
        instructor:instructor_id (
          user_id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get assignment by ID
export async function getAssignmentById(req, res) {
  try {
    const { assignmentId } = req.params;
    
    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        batches:batch_id (
          batch_id,
          batch_name
        ),
        instructor:instructor_id (
          user_id,
          name,
          email
        )
      `)
      .eq('assignment_id', assignmentId)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get assignments by batch
export async function getAssignmentsByBatch(req, res) {
  try {
    const { batchId } = req.params;
    
    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        batches:batch_id (
          batch_id,
          batch_name
        ),
        instructor:instructor_id (
          user_id,
          name,
          email
        )
      `)
      .eq('batch_id', batchId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching assignments by batch:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get assignments by instructor
export async function getAssignmentsByInstructor(req, res) {
  try {
    const { instructorId } = req.params;
    
    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        batches:batch_id (
          batch_id,
          batch_name
        ),
        instructor:instructor_id (
          user_id,
          name,
          email
        )
      `)
      .eq('instructor_id', instructorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching assignments by instructor:', error);
    res.status(500).json({ error: error.message });
  }
}

// Create assignment
export async function createAssignment(req, res) {
  try {
    const { title, description, batch_id, instructor_id, language, due_date, status, max_score } = req.body;

    if (!title || !batch_id || !instructor_id || !language || !due_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('assignments')
      .insert({
        title,
        description,
        batch_id,
        instructor_id,
        language,
        due_date,
        status: status || 'draft',
        max_score: max_score || 100
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: error.message });
  }
}

// Update assignment
export async function updateAssignment(req, res) {
  try {
    const { assignmentId } = req.params;
    const { title, description, batch_id, language, due_date, status, max_score } = req.body;

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (batch_id !== undefined) updateData.batch_id = batch_id;
    if (language !== undefined) updateData.language = language;
    if (due_date !== undefined) updateData.due_date = due_date;
    if (status !== undefined) updateData.status = status;
    if (max_score !== undefined) updateData.max_score = max_score;

    const { data, error } = await supabase
      .from('assignments')
      .update(updateData)
      .eq('assignment_id', assignmentId)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ error: error.message });
  }
}

// Delete assignment
export async function deleteAssignment(req, res) {
  try {
    const { assignmentId } = req.params;

    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('assignment_id', assignmentId);

    if (error) throw error;
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ error: error.message });
  }
}

