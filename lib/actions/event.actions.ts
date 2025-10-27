'use server'
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export const getSimilarEvents = async (slug: string) => {
    try {
        await connectDB()
        const event = await Event.findOne({slug})
        return await Event.find({_id: {$ne: event?._id}, tags: {$in: event?.tags}}).lean()
    } catch (e){
        console.error(e)
        return []
    }
}