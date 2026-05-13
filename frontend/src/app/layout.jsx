export const metadata = {
  title: 'Medical Practice CRM',
  description: 'Patient Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* This 'children' is where your pages will render */}
        <main>{children}</main>
      </body>
    </html>
  )
}