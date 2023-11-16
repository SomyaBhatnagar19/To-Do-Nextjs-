import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {collectionStr} from '../../library/db';
import {ToDoCompleted} from '../../library/model/toDoSchema';

export async function GET() {
    await mongoose.connect(collectionStr);
    const data = await ToDoCompleted.find();
    console.log("In Route.js GET request has given this : ", data);
    return NextResponse.json(data);
}

export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(collectionStr);
    const postData = new ToDoCompleted(payload);
    const result = await postData.save();
    console.log("In Route.js POST request has given this : ", result);
    return NextResponse.json(result);
}