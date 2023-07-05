export const metadata = {
  title: 'Training Helper',
  description: 'Diary for planning fitness trainings schema',
}

export default function Home () {
  return (
    <section id="main-page-body" className="border flex items-center justify-center">
      <p className="text-6xl overflow-hidden">
        Home Page {process.env.NEXT_PUBLIC_API_HOST}
      </p>
    </section>
  )
}
