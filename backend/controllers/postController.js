import postModel from '../models/postSchema.js';

const fileUrl = (req) => req.file?.path || (req.file?.filename ? `/uploads/${req.file.filename}` : '');

const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text && !req.file) return res.status(400).json({ success: false, message: 'Text or image is required' });

    const post = await postModel.create({ user: req.user, text, image: fileUrl(req) });
    const populatedPost = await post.populate('user', 'username avatar');

    res.status(201).json({ success: true, message: 'Post uploaded successfully', post: populatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find()
      .populate('user', 'username avatar')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const posts = await postModel.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    if (post.user.toString() !== req.user) return res.status(403).json({ success: false, message: 'Not authorized' });

    post.text = req.body.text ?? post.text;
    post.image = fileUrl(req) || post.image;
    await post.save();

    res.status(200).json({ success: true, message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    if (post.user.toString() !== req.user) return res.status(403).json({ success: false, message: 'Not authorized' });

    await post.deleteOne();
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const toggleLike = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const alreadyLiked = post.likes.some((id) => id.toString() === req.user);
    post.likes = alreadyLiked
      ? post.likes.filter((id) => id.toString() !== req.user)
      : [...post.likes, req.user];

    await post.save();
    res.status(200).json({ success: true, message: alreadyLiked ? 'Post unliked' : 'Post liked', likes: post.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ success: false, message: 'Comment text is required' });

    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.comments.push({ user: req.user, text });
    await post.save();

    res.status(201).json({ success: true, message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { createPost, getPosts, getPostsByUser, updatePost, deletePost, toggleLike, addComment };
