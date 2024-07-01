import { format } from 'date-fns';

export const formatDateString = (dateString: Date | null): string => {
  if(!dateString) return ""
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM do yyyy, h:mma");
  return formattedDate;
}

export const slugifySentences = (sentence: string): string => {
  // Remove special characters and replace spaces with hyphens
  const slug = sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  // Generate 5 random letters
  const randomLetters = Array.from({ length: 5 }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");

  return `${slug}-${randomLetters}`;
};
