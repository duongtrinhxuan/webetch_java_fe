import axios from 'axios';
import { ShopDetails } from '../data/shopdetail';
import {Shop} from '../data/shop'

export const fetchShops = async (): Promise<ShopDetails[]> => {
  const response = await axios.get('http://localhost:8080/Shop/getListUse');
  return response.data.data;
};

export const fetchShopDetails = async (shopId: string): Promise<ShopDetails> => {
  const response = await axios.get(`http://localhost:8080/Shop/getElementById/${shopId}`);
  return response.data.data;
};

export const createShop = async (shop: ShopDetails) => {
  try {
    const token = localStorage.getItem("token")
    console.log(shop);
    await axios.post("http://localhost:8080/Shop/create", shop, { headers: { Authorization: `Bearer ${token}`, } })
  } catch (error) {
    console.error("không thể tạo shop", error);
    throw error
  }
}

export const deleteshop = async (id: string) => {
  try {
    const token = localStorage.getItem("token")
    await axios.delete(`http://localhost:8080/Shop/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
  } catch (error) {
    console.error("không thể xóa shop", error);
    throw error
  }
}

export const getShop = async (id: string) => {
  try {
    const res = await axios.get<ShopDetails>(`http://localhost:8080/Shop/getElementById/${id}`)
    return res.data.data;
  } catch (error) {
    console.error("không thể lấý shop", error);
    throw error
  }
}

export const editShop = async (shop: ShopDetails) => {
  try {
    const token = localStorage.getItem("token")
    console.log(shop);
    await axios.post("http://localhost:8080/Shop/edit",  shop , { headers: { Authorization: `Bearer ${token}`, } })
  } catch (error) {
    console.error("không thể chỉnh sửa shop", error);
    throw error
  }
}

export async function getShopByUserId(userId: string): Promise<Shop | null> {
  const response = await fetch(`http://localhost:8080/Shop/getElementByUserId/${userId}`);
  if (response.ok) {
    return response.json();
  }
  return null;
}
export async function getShopId(userId: string): Promise<string> {
  const response = await fetch(`http://localhost:8080/Shop/getShopId/${userId}`);
  if (response.ok) {
    const result = await response.json();
    return result.data as string; // Ép kiểu rõ ràng
  }
  return "";
}