import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { readFileAsDataUrl } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false);
  const { posts } = useSelector(store => store.post)
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth)
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
    }
  }
  const createPostHandler = async (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      return toast.error('Caption is required');
    }
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);


    try {
      setLoading(true);
      const res = await axios.post('https://posts-0qau.onrender.com/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setPost([res.data.post, ...posts]));
        toast.success(res.data.message)
        setOpen(false)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Create post error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={ open }>
      <DialogContent onInteractOutside={ () => setOpen(false) }>
        <DialogHeader className='text-center font-semibold'>Create new post</DialogHeader>
        <div className='flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src={ user?.profilePicture } alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>{ user?.username }</h1>
            <span className='text-gray-600 text-xs'>Boihere</span>
          </div>
        </div>
        <Textarea value={ caption } onChange={ (e) => setCaption(e.target.value) } className="focus-visible:ring-transparent border-none" placeHolder="Write a caption.." />
        {
          imagePreview && (
            <div className="w-full  items-center justify-center">
              <img src={ imagePreview } alt="image_preview" className='object-cover h-72 w-full rounded-md' />
            </div>
          )
        }
        <Input ref={ imageRef } type="file" className="hidden" onChange={ fileChangeHandler } />
        <Button onClick={ () => imageRef.current.click() } className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] ">Select from device</Button>
        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" onClick={ createPostHandler } className="w-full">
                Post
              </Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost
