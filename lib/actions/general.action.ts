import { db } from "@/firebase/admin";

export const getInterviewsByUserId = async (userId: string): Promise<Interview[] | null> => {
    try {
        const interviews = await db
            .collection("interviews")
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc")
            .get();

        return interviews.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Interview[];
    } catch (error) {
        console.error("Error fetching interviews:", error);
        throw new Error("Failed to fetch interviews");
    }
}
export const getLatestInterviews = async (params: GetLatestInterviewsParams): Promise<Interview[] | null> => {
    const { userId, limit = 20 } = params;
    try {

        const interviews = await db
            .collection("interviews")
            .orderBy("createdAt", "desc")
            .where("finalized", "==", true)
            .where("userId", "!=", userId)
            .limit(limit)
            .get();

        return interviews.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Interview[];
    } catch (error) {
        console.error("Error fetching interviews:", error);
        throw new Error("Failed to fetch interviews");
    }
}