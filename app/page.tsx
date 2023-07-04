export const metadata = {
  title: 'Training Helper',
  description: 'Diary for planning fitness trainings schema',
}

export default function Home () {
  return (

    <p className="mt-12 mb-12 text-6xl text-center overflow-hidden">
      Home Page {process.env.NEXT_PUBLIC_API_HOST}
    </p>

  )
}
