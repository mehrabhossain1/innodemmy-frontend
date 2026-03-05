import { getDatabase } from "./connection";
import { ConsultationRequest } from "../models";
import { ObjectId } from "mongodb";

type ConsultationRequestDocument = Omit<ConsultationRequest, "_id"> & {
    _id?: ObjectId;
};

async function getConsultationRequestsCollection() {
    const db = await getDatabase();
    return db.collection<ConsultationRequestDocument>("consultation_requests");
}

/**
 * Get all consultation requests
 */
export async function getAllConsultationRequests() {
    const collection = await getConsultationRequestsCollection();
    const requests = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    return requests;
}

/**
 * Get consultation request by ID
 */
export async function findConsultationRequestById(id: string) {
    const collection = await getConsultationRequestsCollection();
    const request = await collection.findOne({ _id: new ObjectId(id) });
    return request;
}

/**
 * Create new consultation request
 */
export async function createConsultationRequest(
    data: Omit<ConsultationRequest, "_id">,
) {
    const collection = await getConsultationRequestsCollection();
    const result = await collection.insertOne({
        ...data,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result.insertedId;
}

/**
 * Update consultation request status
 */
export async function updateConsultationRequestStatus(
    id: string,
    status: "pending" | "contacted" | "completed",
) {
    const collection = await getConsultationRequestsCollection();
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                status,
                updatedAt: new Date(),
            },
        },
    );
    return result.modifiedCount > 0;
}

/**
 * Delete consultation request
 */
export async function deleteConsultationRequest(id: string) {
    const collection = await getConsultationRequestsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
