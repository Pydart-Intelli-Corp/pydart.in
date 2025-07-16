import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theme Examples - PyDart',
  description: 'Demonstration of PyDart theme components and styling',
};

export default function ThemeExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">PyDart Theme Examples</h1>
          <ThemeToggle />
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Primary</h3>
              <Button variant="primary" size="sm">Small Button</Button>
              <Button variant="primary" size="md">Medium Button</Button>
              <Button variant="primary" size="lg">Large Button</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Secondary</h3>
              <Button variant="secondary" size="sm">Small Button</Button>
              <Button variant="secondary" size="md">Medium Button</Button>
              <Button variant="secondary" size="lg">Large Button</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Outline</h3>
              <Button variant="outline" size="sm">Small Button</Button>
              <Button variant="outline" size="md">Medium Button</Button>
              <Button variant="outline" size="lg">Large Button</Button>
              <Button 
                variant="outline" 
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                }
              >
                With Icon
              </Button>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Link</h3>
              <Button variant="link" size="sm">Small Link</Button>
              <Button variant="link" size="md">Medium Link</Button>
              <Button variant="link" size="lg">Large Link</Button>
              <Button 
                variant="link" 
                rightIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                }
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <h3 className="text-xl font-semibold mb-4">Default Card</h3>
              <p className="text-gray-300">This is a default card component with standard styling.</p>
            </Card>
            
            <Card variant="elevated" hoverEffect>
              <h3 className="text-xl font-semibold mb-4">Elevated Card</h3>
              <p className="text-gray-300">This card has elevation and a hover effect. Try hovering over it!</p>
            </Card>
            
            <Card variant="outlined" hoverEffect>
              <h3 className="text-xl font-semibold mb-4">Outlined Card</h3>
              <p className="text-gray-300">This card has a border instead of a background.</p>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <div className="h-20 rounded-md bg-primary"></div>
              <p className="mt-2 text-sm">Primary</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-primary-light"></div>
              <p className="mt-2 text-sm">Primary Light</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-primary-dark"></div>
              <p className="mt-2 text-sm">Primary Dark</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-pydark-900"></div>
              <p className="mt-2 text-sm">PyDark 900</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-pydark-800"></div>
              <p className="mt-2 text-sm">PyDark 800</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-pydark-700"></div>
              <p className="mt-2 text-sm">PyDark 700</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-pydark-600"></div>
              <p className="mt-2 text-sm">PyDark 600</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-pydark-500"></div>
              <p className="mt-2 text-sm">PyDark 500</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-state-success"></div>
              <p className="mt-2 text-sm">Success</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-state-error"></div>
              <p className="mt-2 text-sm">Error</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-5xl font-bold">Heading 1</h1>
              <p className="text-sm text-gray-400 mt-1">text-5xl font-bold</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">Heading 2</h2>
              <p className="text-sm text-gray-400 mt-1">text-4xl font-bold</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Heading 3</h3>
              <p className="text-sm text-gray-400 mt-1">text-3xl font-bold</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold">Heading 4</h4>
              <p className="text-sm text-gray-400 mt-1">text-2xl font-bold</p>
            </div>
            <div>
              <h5 className="text-xl font-bold">Heading 5</h5>
              <p className="text-sm text-gray-400 mt-1">text-xl font-bold</p>
            </div>
            <div>
              <h6 className="text-lg font-bold">Heading 6</h6>
              <p className="text-sm text-gray-400 mt-1">text-lg font-bold</p>
            </div>
            <div>
              <p className="text-base">This is a paragraph with the default text size.</p>
              <p className="text-sm text-gray-400 mt-1">text-base</p>
            </div>
            <div>
              <p className="text-sm">This is smaller text for less important information.</p>
              <p className="text-sm text-gray-400 mt-1">text-sm</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
