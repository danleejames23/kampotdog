export const submitNetlifyForm = async (formName, fields) => {
  const body = new URLSearchParams({ 'form-name': formName });
  Object.entries(fields).forEach(([key, value]) => body.append(key, value ?? ''));

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) throw new Error('Form submission failed');
};
