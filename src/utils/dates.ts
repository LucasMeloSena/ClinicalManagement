import * as dayjs from 'dayjs';
import { Consultation } from 'src/domain/models/Consultation';

export class DateProvider {
  blockCreateANewConsultationBeforeToday(start_at: Date, end_at: Date) {
    const new_start_at = dayjs(start_at);
    const new_end_at = dayjs(end_at);
    const today = dayjs(new Date());

    return new_start_at.isBefore(today) || new_end_at.isBefore(new_start_at);
  }

  verifyIfUserAlreadyHasAConsultation(
    consultationsByNutritionist: Consultation[],
    start_at: Date,
    end_at: Date,
  ) {
    const foundConsultationsConflicts = consultationsByNutritionist.filter(
      (consultation) => {
        const existing_start_at = dayjs(consultation.start_at);
        const existing_end_at = dayjs(consultation.end_at);
        const new_start_at = dayjs(start_at);
        const new_end_at = dayjs(end_at);
        const isInvalidDate =
          new_start_at.isBefore(existing_end_at) &&
          new_end_at.isAfter(existing_start_at);

        return isInvalidDate;
      },
    );

    if (foundConsultationsConflicts.length > 0) return true;
    else return false;
  }
}
