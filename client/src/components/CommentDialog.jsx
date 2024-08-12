import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Send } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'
import { setPost } from '@/redux/postSlice'


const CommentDialog = ({ open, setOpen }) => {

    const [text, setText] = useState("");
    const { selectedPost, posts } = useSelector(store => store.post)
    const dispatch = useDispatch();
    const [comment, setComment] = useState(selectedPost?.comments || []);


    useEffect(() => {
        if (selectedPost && Array.isArray(selectedPost.comments)) {
            setComment(selectedPost.comments);
        } else {
            setComment([]); 
        }
    }, [selectedPost]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText("");
        }
    }

    const sendMessageHandler = async () => {
        try {
            const res = await axios.post(`https://posts-0qau.onrender.com/api/v1/post/comment/${selectedPost?._id}`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {

                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p

                )

                dispatch(setPost(updatedPostData));
                toast.success(res.data.message)
                setText("")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <Dialog open={ open }>
            <DialogContent onInteractOutside={ () => setOpen(false) } className='max-w-5xl p-0 flex flex-col'>
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img
                            src={ selectedPost?.image }
                            alt='post_image'
                            className='w-full h-full object-cover rounded-lg'
                        />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex gap-3 items-center'>
                                <Link to={ '/profile' }>
                                    <Avatar>
                                        <AvatarImage
                                            // className="h-[200px]"
                                            src={ selectedPost?.author?.profilePicture }
                                            alt="post"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link to={ '/profile' } className='font-semibold text-sm'>
                                        { selectedPost?.author?.username }
                                    </Link>
                                    {/* <span className='text-gray-600 text-sm'>Bio here ...</span> */ }
                                </div>

                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                                    <div className='cursor-pointer w-full'>Add to favourite</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {
                                <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                                    { Array.isArray(comment) && comment.length > 0 ? (
                                        comment.map((comment) => <Comment key={ comment._id } comment={ comment } />)
                                    ) : (
                                        <p>No comments yet.</p>
                                    ) }
                                </div>

                            }

                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <Input
                                    text='text'
                                    value={ text }
                                    onChange={ changeEventHandler }
                                    placeholder='Add a comment...'
                                    className='focus-visible:ring-transparent text-sm w-full'

                                />
                                <Button disabled={ !text.trim() } onClick={ sendMessageHandler } variant="outline">
                                    <Send />
                                </Button>


                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog
