import mongoose, { Document, Model, Schema } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: ['online', 'offline', 'hybrid'],
      lowercase: true,
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create unique index on slug for fast lookups
EventSchema.index({ slug: 1 });

/**
 * Pre-save hook to generate slug, normalize date and time
 * - Only regenerates slug if title has changed
 * - Handles slug conflicts by appending numeric suffix
 * - Normalizes date to ISO format (YYYY-MM-DD)
 * - Normalizes time to 24-hour format (HH:MM)
 */
EventSchema.pre('save', async function (next) {
  // Generate slug from title if title is modified or document is new
  if (this.isModified('title')) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // Check for slug conflicts and append numeric suffix if needed
    let slug = baseSlug;
    let counter = 1;
    
    while (true) {
      // Check if slug exists (excluding current document)
      const existingEvent = await mongoose.models.Event.findOne({
        slug,
        _id: { $ne: this._id },
      });

      if (!existingEvent) {
        // Slug is unique, use it
        this.slug = slug;
        break;
      }

      // Slug exists, try with numeric suffix
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified('date')) {
    try {
      const parsedDate = new Date(this.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }
      // Store as ISO date string (YYYY-MM-DD)
      this.date = parsedDate.toISOString().split('T')[0];
    } catch (error) {
      return next(new Error('Date must be a valid date format'));
    }
  }

  // Normalize time to 24-hour format (HH:MM)
  if (this.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const time12Regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

    if (timeRegex.test(this.time)) {
      // Already in 24-hour format, ensure proper padding
      const [hours, minutes] = this.time.split(':');
      this.time = `${hours.padStart(2, '0')}:${minutes}`;
    } else if (time12Regex.test(this.time)) {
      // Convert 12-hour format to 24-hour format
      const match = this.time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const period = match[3].toUpperCase();

        if (period === 'PM' && hours !== 12) {
          hours += 12;
        } else if (period === 'AM' && hours === 12) {
          hours = 0;
        }

        this.time = `${hours.toString().padStart(2, '0')}:${minutes}`;
      }
    } else {
      return next(new Error('Time must be in HH:MM or HH:MM AM/PM format'));
    }
  }

  next();
});

// Prevent model recompilation in development
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
