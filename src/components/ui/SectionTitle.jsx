import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <Reveal
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-widest rtl:tracking-normal uppercase text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
