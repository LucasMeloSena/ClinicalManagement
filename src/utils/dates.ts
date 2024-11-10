import { Consultation } from 'src/domain/models/Consultation';
import * as dayjs from 'dayjs';

export class DateProvider {
  blockDateBeforeToday(start_at: Date, end_at: Date) {
    const new_start_at = dayjs(this.convertDateToLocal(start_at));
    const new_end_at = dayjs(this.convertDateToLocal(end_at));
    const today = dayjs(this.convertDateToLocal(new Date()));

    return new_start_at.isBefore(today) || new_end_at.isBefore(new_start_at);
  }

  verifyIfUserAlreadyHasAConsultation(
    consultationsByNutritionist: Consultation[],
    start_at: Date,
    end_at: Date,
  ) {
    const foundConsultationsConflicts = consultationsByNutritionist.filter(
      (consultation) => {
        const existingStartAt = dayjs(consultation.startAt);
        const existingEndAt = dayjs(consultation.endAt);
        const newStartAt = dayjs(start_at);
        const newEndAt = dayjs(end_at);
        const isInvalidDate =
          newStartAt.isBefore(existingEndAt) &&
          newEndAt.isAfter(existingStartAt);

        return isInvalidDate;
      },
    );

    if (foundConsultationsConflicts.length > 0) return true;
    else return false;
  }

  convertDateToLocal(date: Date) {
    return new Date(date.getTime() - 3 * 60 * 60 * 1000);
  }
}
