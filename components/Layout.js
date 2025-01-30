export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <nav className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">My Portfolio</h1>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    );
  }