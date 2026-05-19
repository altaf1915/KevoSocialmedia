import { useContext, useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { PostContext } from '../context/PostsContext';

const AddPost = () => {
  const { createPost } = useContext(PostContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImage(file || null);
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(text, image);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-soft backdrop-blur">
        <div className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-8 text-white">
          <h2 className="text-3xl font-black">Create a new post</h2>
          <p className="mt-2 text-white/80">Share your thoughts with a beautiful image.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div>
            <label className="mb-2 block font-bold text-slate-700">Caption</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows="5" required placeholder="What's on your mind?" className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/60 p-8 text-center transition hover:bg-indigo-50">
            <IoImageOutline className="text-5xl text-indigo-600" />
            <span className="mt-3 font-bold text-slate-800">Upload image</span>
            <span className="text-sm text-slate-500">PNG, JPG, WEBP accepted</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {preview && <img src={preview} alt="preview" className="max-h-96 w-full rounded-3xl object-cover shadow-soft" />}

          <button type="submit" className="w-full rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-indigo-700">
            Publish Post
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddPost;
