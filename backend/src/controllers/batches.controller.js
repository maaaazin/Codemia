import { supabase } from '../config/supabase.js';

// Get all batches
export async function getBatches(req, res) {
  try {
    const { data, error } = await supabase
      .from('batches')
      .select(`
        *,
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
    console.error('Error fetching batches:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get batch by ID
export async function getBatchById(req, res) {
  try {
    const { batchId } = req.params;
    
    const { data, error } = await supabase
      .from('batches')
      .select(`
        *,
        instructor:instructor_id (
          user_id,
          name,
          email
        )
      `)
      .eq('batch_id', batchId)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Batch not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching batch:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get batches by instructor
export async function getBatchesByInstructor(req, res) {
  try {
    const { instructorId } = req.params;
    
    const { data, error } = await supabase
      .from('batches')
      .select(`
        *,
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
    console.error('Error fetching batches by instructor:', error);
    res.status(500).json({ error: error.message });
  }
}

// Create batch
export async function createBatch(req, res) {
  try {
    const { batch_name, instructor_id, academic_year } = req.body;

    if (!batch_name || !instructor_id) {
      return res.status(400).json({ error: 'Missing required fields: batch_name and instructor_id' });
    }

    const { data, error } = await supabase
      .from('batches')
      .insert({
        batch_name,
        instructor_id,
        academic_year: academic_year || null
      })
      .select(`
        *,
        instructor:instructor_id (
          user_id,
          name,
          email
        )
      `)
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({ error: error.message });
  }
}

