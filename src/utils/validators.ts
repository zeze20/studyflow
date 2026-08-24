export const validateSessionForm = (topic: string, durationMinutes: number): string | null => {
  if (!topic || topic.trim().length === 0) {
    return 'Lütfen çalışma konusunu belirtiniz.';
  }
  if (topic.trim().length < 3) {
    return 'Konu başlığı en az 3 karakter olmalıdır.';
  }
  if (isNaN(durationMinutes) || durationMinutes <= 0 || durationMinutes > 1440) {
    return 'Geçerli bir çalışma süresi giriniz (1 - 1440 dakika).';
  }
  return null;
};
