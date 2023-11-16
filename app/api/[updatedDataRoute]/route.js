//for deleting and edit functionality
// api/[updateDataRoute]/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {collectionStr} from "../../library/db";
import { todoData } from '../../library/model/toDoSchema';

export async function PUT(request, content) {
    const todoId = content.params.updatedDataRoute;
    const payload = await request.json();
  
    try {
      await mongoose.connect(collectionStr);
      const result = await todoData.findByIdAndUpdate(todoId, payload, { new: true });
  
      console.log("Updated Data: ", result);
  
      if (!result) {
        return NextResponse.error({
          status: 404,
          message: 'Task not found with the provided ID',
        });
      }
  
      return NextResponse.json(result);
    } catch (error) {
      console.error("Error occurred during PUT request: ", error);
      return NextResponse.error({
        status: 500,
        message: 'Internal server error occurred while processing the request',
      });
    }
  }
  

export async function DELETE(request, content) {
    const todoId = content.params.updatedDataRoute;
    const filter = { _id: todoId }
    try {
        await mongoose.connect(collectionStr);
        const result = await todoData.deleteOne(filter);
        console.log("In Route.js DELETE request has given this: ", result);
        if (!result) {
            return NextResponse.error({
                status: 404,
                message: 'Task not found with the provided ID',
            });
        }
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error occurred during DELETE request: ", error);
        return NextResponse.error({
            status: 500,
            message: 'Internal server error occurred while processing the request',
        });
    }
}