import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import blogAPI from '../../services/blogAPI';

export const addBlog = createAsyncThunk('blog/addBlog', async data => {
  try {
    await blogAPI.addBlog(data);
    const res = await blogAPI.getAllBlog();
    return res.result;
  } catch (error) {
    if (error.response.status === 401) {
      throw console.log(error, 'day la loi o them blog');
    } else {
      console.log(error, 'day la loi o them blog');
    }
  }
});
export const getBlog = createAsyncThunk('blog/getBlog', async () => {
  try {
    const response = await blogAPI.getAllBlog();
    return response.result;
  } catch (error) {
    if (error.response.status === 401) {
      throw console.log(error, 'day la loi o lay blog');
    } else {
      console.log(error, 'day la loi o lay blog');
    }
  }
});
export const getIdBlog = createAsyncThunk('blog/getIdBlog', async id => {
  try {
    const res = await blogAPI.getBlog(id);
    return res.result;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(' Cần phải Đăng Nhập ');
    } else {
      console.log(error);
    }
  }
});
export const updateBlog = createAsyncThunk('blog/updateBlog', async data => {
  try {
    await blogAPI.updateBlog(data);
    const res = await blogAPI.getAllBlog();
    return res.result;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(' Cần phải Đăng Nhập ');
    } else {
      console.log(error);
    }
  }
});
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async id => {
  try {
    await blogAPI.deleteBlog(id);
    const res = await blogAPI.getAllBlog();
    return res.result;
  } catch (error) {
    if (error.response.status === 401) {
      console.log(error.response);
      throw new Error(' Cần phải Đăng Nhập mới xóa được');
    } else {
      console.log(error);
    }
  }
});

const BlogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    isloadingBlogs: true,
    err: null,
    isLoadingBlog: true,
    blog: {},
  },
  reducers: {},
  extraReducers: builer => {
    builer
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.blogs = null;
        state.err = action.error;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isloadingBlogs = false;
        state.err = null;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.blogs = [];
        state.err = action.error;
      })
      .addCase(getIdBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isLoadingBlog = false;
        state.err = null;
      })
      .addCase(getIdBlog.rejected, (state, action) => {
        state.blog = [];
        state.err = action.error;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isloadingBlogs = false;
        state.err = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.blogs = null;
        state.err = action.error;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.err = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.err = action.error;
      });
  },
});
export default BlogSlice.reducer;
