// src/components/user/ask/AskQuestionForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bold, 
  Italic, 
  Code, 
  Link, 
  List, 
  ListOrdered, 
  Quote,
  X,
  Check,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AskQuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  // Hardcoded user ID - replace with your actual user ID from the database
  const HARDCODED_USER_ID = 'your-user-id-here'; // Replace this with an actual UUID from your users table

  const minDescriptionLength = 30;
  const maxTags = 5;

  const tips = [
    'Summarize your problem in a clear title',
    'Describe what you\'ve tried and expected results',
    'Include relevant code or error messages',
    'Use relevant tags to help others find your question',
    'Proofread before posting'
  ];

  const fetchPopularTags = async () => {
    try {
      setIsLoadingTags(true);
      const { data: tagData, error } = await supabase
        .from('tags')
        .select('name')
        .order('count', { ascending: false })
        .limit(7);

      if (error) {
        console.error('Error fetching popular tags:', error);
        // Fallback to default tags if fetch fails
        setPopularTags([
          'javascript', 'react', 'typescript', 'nextjs', 'nodejs', 'python', 'postgresql'
        ]);
      } else {
        setPopularTags(tagData?.map(tag => tag.name) || []);
      }
    } catch (err) {
      console.error('Error fetching popular tags:', err);
      // Fallback to default tags
      setPopularTags([
        'javascript', 'react', 'typescript', 'nextjs', 'nodejs', 'python', 'postgresql'
      ]);
    } finally {
      setIsLoadingTags(false);
    }
  };

  useEffect(() => {
    fetchPopularTags();
  }, []);

  const createOrGetTag = async (tagName: string): Promise<string> => {
    try {
      // First, try to get existing tag
      const { data: existingTag, error: fetchError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName.toLowerCase())
        .maybeSingle();

      if (existingTag) {
        return existingTag.id;
      }

      // If tag doesn't exist, create it
      const { data: newTag, error: createError } = await supabase
        .from('tags')
        .insert([{ name: tagName.toLowerCase() }])
        .select('id')
        .single();

      if (createError) {
        throw new Error(`Failed to create tag: ${createError.message}`);
      }

      return newTag.id;
    } catch (err) {
      console.error('Error in createOrGetTag:', err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Validation
      if (!title.trim()) {
        throw new Error('Title is required');
      }

      if (description.length < minDescriptionLength) {
        throw new Error(`Description must be at least ${minDescriptionLength} characters`);
      }

      console.log('Creating question for hardcoded user:', HARDCODED_USER_ID);

      // Insert the question
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert([
          {
            user_id: HARDCODED_USER_ID,
            title: title.trim(),
            description: description.trim(),
          }
        ])
        .select('id')
        .single();

      if (questionError) {
        console.error('Question creation error:', questionError);
        throw new Error(`Failed to create question: ${questionError.message}`);
      }

      console.log('Question created successfully:', questionData);

      // Handle tags if any
      if (tags.length > 0) {
        console.log('Processing tags:', tags);
        const tagIds: string[] = [];
        
        // Create or get tag IDs
        for (const tagName of tags) {
          try {
            const tagId = await createOrGetTag(tagName);
            tagIds.push(tagId);
          } catch (tagError) {
            console.error(`Error processing tag ${tagName}:`, tagError);
            // Continue with other tags instead of failing completely
          }
        }

        // Link tags to question
        if (tagIds.length > 0) {
          const questionTagInserts = tagIds.map(tagId => ({
            question_id: questionData.id,
            tag_id: tagId
          }));

          const { error: tagLinkError } = await supabase
            .from('question_tags')
            .insert(questionTagInserts);

          if (tagLinkError) {
            console.error('Failed to link tags:', tagLinkError);
            // Question was created but tags failed - we could handle this differently
            // For now, we'll show a warning but still consider it success
          }
        }
      }

      // Success!
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setTags([]);
      setTagInput('');

      console.log('Question created successfully with ID:', questionData.id);
      
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setTagInput('');
    setError(null);
    setSuccess(false);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < maxTags && !tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = (tag: string) => {
    if (tags.length < maxTags && !tags.includes(tag.toLowerCase())) {
      setTags([...tags, tag.toLowerCase()]);
    }
  };

  const isFormValid = title.trim() && description.length >= minDescriptionLength;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-8">
        {/* Main Form */}
        <div className="flex-1 max-w-4xl">
          {/* Form Header */}
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Ask a Question</h1>
            <span className="text-sm text-gray-500">Posting as default user</span>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">Question posted successfully!</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <X className="w-5 h-5 text-red-600" />
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {/* Title Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Title</h2>
              <p className="text-sm text-gray-600 mb-4">
                Be specific and imagine you're asking a question to another person
              </p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How do I center a div in CSS?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Description Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-sm text-gray-600 mb-4">
                Include all the information someone would need to answer your question
              </p>
              
              {/* Toolbar */}
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-t-lg bg-gray-50 border-b-0">
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <Bold className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <Italic className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <Code className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <Link className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <List className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <ListOrdered className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" disabled={isSubmitting}>
                  <Quote className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              {/* Text Area */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide more details about your question. Include what you've tried, error messages, code samples, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                rows={8}
                disabled={isSubmitting}
              />
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                    <span className="text-xs">i</span>
                  </span>
                  <span>Minimum {minDescriptionLength} characters</span>
                </div>
                <span className={`text-sm ${
                  description.length < minDescriptionLength ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {description.length} characters
                </span>
              </div>
            </div>
          </div>

          {/* Tags Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Tags</h2>
              <p className="text-sm text-gray-600 mb-4">
                Add up to 5 tags to describe what your question is about
              </p>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="e.g. javascript, react, typescript"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  disabled={tags.length >= maxTags || isSubmitting}
                />
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {tags.length}/{maxTags} tags used
                  </span>
                </div>
              </div>

              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                        disabled={isSubmitting}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Popular Tags */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Tags</h3>
                {isLoadingTags ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading popular tags...
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        disabled={tags.includes(tag.toLowerCase()) || tags.length >= maxTags || isSubmitting}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-red-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Publishing...' : 'Publish Question'}
            </button>
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">Tips for a Great Question</h2>
            </div>
            
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}