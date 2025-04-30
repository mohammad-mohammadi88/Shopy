import { CategoryType } from "@Contracts/categories";

export interface Product{
	body:string;
	category:CategoryType;
	created_at:number;
	id:any;
	title:string;
	price:number;
	user_id:number
}