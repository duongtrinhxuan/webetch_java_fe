import axios from "axios";
import { CommentDTO } from "../data/comment";


export const fetchComments = async (productId: string): Promise<Comment[]> => {
    try {
      const response = await axios.get<Comment[]>(`http://localhost:8080/Comment/getListUse/${productId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm cho danh mục ${productId}:`, error);
      throw error;
    }
  };
  export const addComment =async(Comment:CommentDTO)=>{
    try {
      const { id, ...commentWithoutId } = Comment;     
        const token = localStorage.getItem("token")
        await axios.post(`http://localhost:8080/Comment/create`,commentWithoutId ,{ headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.error("không thể thêm sản phẩm",error);
        throw error
    }
}
export const editComment=async(Comment:CommentDTO)=>{
  try {
      const token=localStorage.getItem("token")
      await axios.post(`http://localhost:8080/Comment/edit`,Comment,{ headers: {Authorization:`Bearer ${token}`} })
  } catch (error) {
      console.error("không thể chỉnh sửa sản phẩm",error);
      throw error
  }
}

export const deleteComment=async(id:string)=>{
  try {
      const token=localStorage.getItem("token")
      const res=await axios.post(`http://localhost:8080/Comment/delete/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
      return res.data
  } catch (error) {
      console.error("không thể xóa sản phẩm",error);
      throw error
  }
}

  