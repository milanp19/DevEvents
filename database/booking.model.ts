import mongoose, { Document, Model, Schema } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Compound unique index to enforce one booking per user per event
// NOTE: Before deploying, ensure existing duplicates are cleaned up
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * NOTE: Event existence validation should be performed in the service layer
 * before calling Booking.create() to avoid performance overhead and race conditions.
 * 
 * Example service layer validation:
 * const event = await Event.findById(eventId);
 * if (!event) throw new Error('Event not found');
 * await Booking.create({ eventId, email });
 */

// Prevent model recompilation in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
