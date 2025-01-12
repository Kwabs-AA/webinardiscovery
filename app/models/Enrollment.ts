import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  webinarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent multiple enrollments
enrollmentSchema.index({ webinarId: 1, email: 1 }, { unique: true });

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;