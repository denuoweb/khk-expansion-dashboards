import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Users, AlertTriangle, Target, Calendar } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'contact' | 'risk' | 'kpi' | 'document' | 'meeting';
  category: string;
  url?: string;
  metadata?: Record<string, any>;
}

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { globalTasks, sharedData } = useAppContext();

  // Mock search data - in a real app, this would come from APIs
  const searchableData: SearchResult[] = [
    {
      id: '1',
      title: 'University of Michigan Risk Assessment',
      description: 'Comprehensive risk evaluation for expansion',
      type: 'risk',
      category: 'Compliance',
      metadata: { riskLevel: 'Low', lastReview: '2024-01-05' }
    },
    {
      id: '2',
      title: 'Q1 Marketing Campaign Templates',
      description: 'Email and social media templates for recruitment',
      type: 'document',
      category: 'Marketing',
      metadata: { status: 'Active', downloads: 23 }
    },
    {
      id: '3',
      title: 'Dr. Sarah Johnson - Student Life Director',
      description: 'University of Michigan contact',
      type: 'contact',
      category: 'Recruitment',
      metadata: { university: 'University of Michigan', status: 'Active' }
    },
    {
      id: '4',
      title: 'Universities Contacted KPI',
      description: 'Track outreach progress to target universities',
      type: 'kpi',
      category: 'Analytics',
      metadata: { current: 47, target: 50, trend: '+12%' }
    },
    {
      id: '5',
      title: 'Executive Committee Meeting',
      description: 'Weekly leadership meeting minutes',
      type: 'meeting',
      category: 'Secretary',
      metadata: { date: '2024-01-08', attendees: 7 }
    }
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate search delay
    const searchTimeout = setTimeout(() => {
      const filteredResults = searchableData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      // Add tasks to search results
      const taskResults: SearchResult[] = globalTasks
        .filter(task => 
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
        )
        .map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          type: 'task' as const,
          category: 'Tasks',
          metadata: { status: task.status, priority: task.priority }
        }));

      setResults([...filteredResults, ...taskResults]);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, globalTasks]);

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'task': return <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />;
      case 'contact': return <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />;
      case 'risk': return <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />;
      case 'kpi': return <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />;
      case 'document': return <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />;
      case 'meeting': return <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500" />;
      default: return <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-12 left-0 w-full sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 sm:max-h-96 overflow-hidden">
            {query.length < 2 ? (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Type at least 2 characters to search</p>
              </div>
            ) : isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 mt-2 text-sm">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found for "{query}"</p>
              </div>
            ) : (
              <div className="max-h-72 sm:max-h-80 overflow-y-auto">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600">{results.length} results found</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer touch-manipulation"
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                        // In a real app, navigate to the result
                      }}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        {getResultIcon(result.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{result.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-blue-600">{result.category}</span>
                            {result.metadata && (
                              <span className="text-xs text-gray-500">
                                {result.type === 'kpi' && `${result.metadata.current}/${result.metadata.target}`}
                                {result.type === 'risk' && result.metadata.riskLevel}
                                {result.type === 'task' && result.metadata.status}
                                {result.type === 'contact' && result.metadata.university}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearch;