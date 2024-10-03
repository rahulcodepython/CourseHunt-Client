"use client";
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { HMSToSeconds, SecondsToHMS } from '@/utils';
import { UseFormSetValue } from 'react-hook-form';
import { DurationTimeState } from '@/types';

const DurationField = ({ duration, setValue }: {
    duration: number;
    setValue: UseFormSetValue<any>;
}) => {
    const [time, setTime] = useState<DurationTimeState>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const { hours, minutes, seconds } = SecondsToHMS(duration);
        setTime({ hours, minutes, seconds });
    }, [duration]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, unit: keyof DurationTimeState) => {
        const value = parseInt(e.target.value, 10);
        setTime((prev) => ({
            ...prev,
            [unit]: isNaN(value) ? 0 : value,
        }));

    };

    useEffect(() => {
        setValue('duration', HMSToSeconds(time.hours, time.minutes, time.seconds));
    }, [time]);

    return (
        <form>
            <div className="grid grid-cols-3 gap-2">
                <Input
                    type="number"
                    id="hours"
                    placeholder="Hours"
                    value={time.hours}
                    onChange={(e) => handleInputChange(e, 'hours')}
                />
                <Input
                    type="number"
                    id="minutes"
                    placeholder="Minutes"
                    value={time.minutes}
                    onChange={(e) => handleInputChange(e, 'minutes')}
                />
                <Input
                    type="number"
                    id="seconds"
                    placeholder="Seconds"
                    value={time.seconds}
                    onChange={(e) => handleInputChange(e, 'seconds')}
                />
            </div>
        </form>
    );
};

export default DurationField;
