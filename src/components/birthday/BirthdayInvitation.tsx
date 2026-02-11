import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DateDisplay } from "./DateDisplay";
import { LocationCard } from "./LocationCard";
import { ActivityTimeline } from "./ActivityTimeline";
import { PasswordInput } from "./PasswordInput";
import { UnlockedContent } from "./UnlockedContent";
import { FloatingPetals } from "./FloatingPetals";
import { BirthdayCountdown } from "./BirthdayCountdown";

const birthdayData = {
  date: "February 5",
  dayOfWeek: "Thursday",
  year: 2025,
  venue: "SM Megamall",
  address: "123 Celebration Lane, Downtown",
  activities: [
    {
      time: "2:00 PM",
      title: "Arrival & Welcome",
      description: "Gather with loved ones for an afternoon of celebration",
      icon: "star" as const,
    },
    {
      time: "3:00 PM",
      title: "Afternoon Tea",
      description: "Enjoy delicate pastries and refreshments",
      icon: "coffee" as const,
    },
    {
      time: "4:30 PM",
      title: "Music & Dancing",
      description: "Dance to your favorite songs",
      icon: "music" as const,
    },
    {
      time: "6:00 PM",
      title: "Birthday Cake",
      description: "Make a wish and celebrate",
      icon: "cake" as const,
    },
  ],
  password: "sweetheart",
  recipientName: "My Darling",
  personalMessage: `On this special day, I wanted to create something as beautiful as you are.\n\nEvery moment with you is a celebration, but today is extra special because it's the day the world was blessed with your presence.\n\nGet ready for an afternoon filled with love, laughter, and memories we'll treasure forever.\n\nHappy Birthday, my love. ❤️`,
};

export function BirthdayInvitation() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Audio URL for birthday song - replace with your audio file
  const audioUrl = "/path-to-your-audio-file.mp3";

  // Create the target birthday date
  const birthdayDate = new Date(`${birthdayData.date}, ${birthdayData.year}`);

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF7A' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating petals */}
      <FloatingPetals />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12"
          >
            {/* Mobile-first single column layout */}
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                {/* Left side - Date, Countdown, and Location */}
                <div className="space-y-6 sm:space-y-8">
                  <DateDisplay
                    date={birthdayData.date}
                    dayOfWeek={birthdayData.dayOfWeek}
                  />

                  <BirthdayCountdown targetDate={birthdayDate} delay={0.15} />

                  <LocationCard
                    venue={birthdayData.venue}
                    address={birthdayData.address}
                  />

                  <PasswordInput
                    onCorrectPassword={() => setIsUnlocked(true)}
                    correctPassword={birthdayData.password}
                  />
                </div>

                {/* Right side - Activity Timeline */}
                <div>
                  <ActivityTimeline activities={birthdayData.activities} />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 min-h-screen"
          >
            <UnlockedContent
              recipientName={birthdayData.recipientName}
              personalMessage={birthdayData.personalMessage}
              audioUrl={audioUrl}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
