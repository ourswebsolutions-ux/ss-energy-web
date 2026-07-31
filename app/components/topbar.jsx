"use client";

const items = [
  "✨ Sunday Off ✨",
  "🔥 24-Hours Order Processing Time and 2 - 5 Working Days Delivery Time 🔥",
  "✨ Working Hours Mon–Sat 09:00AM to 05:00PM ✨",
];

export default function TopBar() {
  return (
    <div className="w-full bg-[#2b2b2b] text-white overflow-hidden border-b border-neutral-700">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-8 text-sm font-medium tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}