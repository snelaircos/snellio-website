export async function sendEmail({
  to,
  subject,
  html,
  text
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`
    },
    body: JSON.stringify({
      from: 'no-reply@snellio.nl',
      to,
      subject,
      html,
      text
    })
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Resend email failed: ${response.status} ${body}`)
  }

  return response.json()
}
