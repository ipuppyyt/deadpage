// DeadPage.ts
import { useEffect } from 'react';

interface DeadPageProps {
    date: string;
    status: 'paid' | 'notpaid'; // Require status prop to be provided
    duration?: number; // Make duration optional
}

const DeadPage = ({ date, status, duration = 7 }: DeadPageProps): null => {
    if (!date || !status) {
        throw new Error('Both "date" and "status" props are required.');
    }

    useEffect(() => {
        if (status === 'paid') {
            return; // If status is 'paid', do nothing
        }

        const dueDate = new Date(date);
        const currentDate = new Date();
        const daysDeadline = duration;

        const utc1 = Date.UTC(
            dueDate.getFullYear(),
            dueDate.getMonth(),
            dueDate.getDate()
        );
        const utc2 = Date.UTC(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

        if (days > 0) {
            const daysLate = daysDeadline - days;
            let opacity = (daysLate * 100) / daysDeadline / 100;
            opacity = opacity < 0 ? 0 : opacity;
            opacity = opacity > 1 ? 1 : opacity;

            if (opacity >= 0 && opacity <= 1) {
                document.body.style.opacity = opacity.toString();
            }
        }
    }, [date, status, duration]);

    return null;
};

export default DeadPage;
