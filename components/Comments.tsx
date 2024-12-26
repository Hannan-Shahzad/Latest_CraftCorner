'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Trash2 } from 'lucide-react'

interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

interface CommentsProps {
  productId: string
}

export default function Comments({ productId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${productId}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [productId])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    }

    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments))
    setNewComment('')
  }

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId)
    setComments(updatedComments)
    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments))
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-pink-600 mb-4">Comments</h2>
      {comments.length > 0 ? (
        <ul className="space-y-4 mb-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-pink-50 rounded-lg p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold">{comment.userName}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              {user && user.role === 'admin' && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-4">No comments yet.</p>
      )}
      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-pink-500"
            rows={3}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Please log in to post a comment.</p>
      )}
    </div>
  )
}

