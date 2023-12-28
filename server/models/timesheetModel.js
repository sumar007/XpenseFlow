import mongoose from 'mongoose';

const TimeSheetSchema = new mongoose.Schema({
    
      managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager'
      },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },

  projects: 
    {
      projectName: String,
      tasks: 
        {
          taskName: String,
          Monday: Number,
          Tuesday: Number,
          Wednesday: Number,
          Thursday: Number,
          Friday: Number,
          Saturday: Number,
          Sunday: Number,
          totalHours: {
            type: Number,
            default: function () {
              return this.Monday + this.Tuesday + this.Wednesday + this.Thursday + this.Friday + this.Saturday + this.Sunday;
            }
          }
        }
      
    }
  
});

const TimeSheet = mongoose.model('TimeSheet', TimeSheetSchema);

export default TimeSheet;
