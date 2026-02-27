import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, MoreVertical, Check, X, 
  Trash2, Plus, Edit2, Upload, AlertCircle,
  Settings, LayoutTemplate, Image as ImageIcon
} from 'lucide-react';

// Mock Data
const VARIANTS = [
  { id: 'digital', name: 'Digital', tags: ['Fallback', 'Active 1/1'], size: '300x600', platform: 'Google', adType: 'Display ad' },
  { id: 'advertisers', name: 'Advertisers', tags: ['Active 1/1'], size: '300x600', platform: 'Google', adType: 'Display ad' }
];

export default function App() {
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [isRichMediaSelected, setIsRichMediaSelected] = useState(true);
  const [showRules, setShowRules] = useState(false);
  
  const [rules, setRules] = useState([
    { id: '2', text: 'DV Line Item' },
    { id: '3', text: 'DV Line Item & CM360 Placement' }
  ]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleSelectAll = () => {
    if (selectedVariants.length === VARIANTS.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants(VARIANTS.map(v => v.id));
    }
  };

  const handleSelectVariant = (id: string) => {
    if (selectedVariants.includes(id)) {
      setSelectedVariants(selectedVariants.filter(v => v !== id));
    } else {
      setSelectedVariants([...selectedVariants, id]);
    }
  };

  const handlePublishClick = () => {
    setIsPublishModalOpen(true);
  };

  const handlePublishConfirm = () => {
    console.log("Publishing variants to CM360:", selectedVariants);
    setIsPublishModalOpen(false);
  };

  // Drag and drop logic
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    // Required for Firefox
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    if (draggedIdx === null || draggedIdx === index) return;
    
    const newRules = [...rules];
    const draggedRule = newRules[draggedIdx];
    newRules.splice(draggedIdx, 1);
    newRules.splice(index, 0, draggedRule);
    
    setDraggedIdx(index);
    setRules(newRules);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    console.log("Updated rules order:", rules.map(r => r.text));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-sm font-sans text-gray-800">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <div className="flex items-center text-gray-500 text-xs space-x-2">
              <span>Producers</span>
              <span>›</span>
              <span className="font-medium text-gray-900">[Paul] Live Template Editor</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
              <span className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center text-[10px] font-bold text-blue-700">G</span>
              <span>2 creatives in total (2 approved) • 1 day ago</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
            <Plus size={16} />
            <span>Add Variant</span>
          </button>
          <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <Settings size={16} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6 max-w-[1600px] mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-6 border-b border-gray-200 w-full max-w-md">
            <button className="pb-3 border-b-2 border-indigo-600 text-indigo-600 font-medium flex items-center space-x-2">
              <LayoutTemplate size={16} />
              <span>Content</span>
            </button>
            <button className="pb-3 text-gray-500 hover:text-gray-700 font-medium flex items-center space-x-2 transition-colors">
              <ImageIcon size={16} />
              <span>Creative Approval</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search within this producer..." 
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs font-medium">0</span>
              <span>Filters</span>
              <Filter size={14} />
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span className="bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-medium">1</span>
              <span>Actions</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Action Bar (Visible when items selected) */}
        {selectedVariants.length > 0 && (
          <div className="bg-[#8b5cf6] text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="font-medium">
              {selectedVariants.length} variants, {selectedVariants.length} creatives selected
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-indigo-100 transition-colors">
                <Edit2 size={16} />
                <span>Edit</span>
                <ChevronDown size={14} />
              </button>
              <button 
                onClick={handlePublishClick}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-md transition-colors font-medium"
              >
                <Upload size={16} />
                <span>Publish</span>
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className={`bg-white border border-gray-200 shadow-sm ${selectedVariants.length > 0 ? 'rounded-b-lg border-t-0' : 'rounded-lg'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="p-4 w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedVariants.length === VARIANTS.length && VARIANTS.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#8b5cf6] focus:ring-[#8b5cf6] w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="p-4 font-medium w-64">Variant name</th>
                  <th className="p-4 font-medium border-l border-gray-200" colSpan={3}>Activations</th>
                  <th className="p-4 font-medium border-l border-gray-200">Signal</th>
                  <th className="p-4 font-medium border-l border-gray-200" colSpan={2}>Platform</th>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                  <th className="p-4"></th>
                  <th className="p-4"></th>
                  <th className="p-4 border-l border-gray-200 font-medium">Publishing</th>
                  <th className="p-4 border-l border-gray-200 font-medium">Ad Name</th>
                  <th className="p-4 border-l border-gray-200 font-medium">CreativeName</th>
                  <th className="p-4 border-l border-gray-200 font-medium">User Segment</th>
                  <th className="p-4 border-l border-gray-200 font-medium">Platform</th>
                  <th className="p-4 border-l border-gray-200 font-medium">Ad Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {VARIANTS.map((variant) => (
                  <tr key={variant.id} className={`hover:bg-gray-50 transition-colors ${selectedVariants.includes(variant.id) ? 'bg-[#8b5cf6]/5' : ''}`}>
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        checked={selectedVariants.includes(variant.id)}
                        onChange={() => handleSelectVariant(variant.id)}
                        className="rounded border-gray-300 text-[#8b5cf6] focus:ring-[#8b5cf6] w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <ChevronDown size={16} className="text-gray-400 mt-1 cursor-pointer" />
                        <div className="w-8 h-4 bg-[#8b5cf6] rounded-full mt-1 relative cursor-pointer">
                          <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center justify-between">
                            {variant.name}
                            <MoreVertical size={14} className="text-gray-400 cursor-pointer" />
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {variant.tags.map(tag => (
                              <span key={tag} className={`px-2 py-0.5 rounded text-xs font-medium flex items-center space-x-1 ${tag.includes('Active') ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                {tag.includes('Active') && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1"></span>}
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-xs text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded font-medium">
                            {variant.size}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-l border-gray-200 text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span>No Campaigns yet</span>
                        <AlertCircle size={14} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="p-4 border-l border-gray-200 text-gray-400 cursor-pointer hover:text-gray-600">
                      <div className="flex items-center justify-between">
                        Add name <Plus size={14} />
                      </div>
                    </td>
                    <td className="p-4 border-l border-gray-200 text-gray-400 cursor-pointer hover:text-gray-600">
                      <div className="flex items-center justify-between">
                        Add name <Plus size={14} />
                      </div>
                    </td>
                    <td className="p-4 border-l border-gray-200 text-gray-400">
                      {variant.id === 'advertisers' ? (
                        <span className="text-purple-600 font-medium text-xs">Segment traffic</span>
                      ) : (
                        <div className="flex items-center justify-between cursor-pointer hover:text-gray-600">
                          Add segments <Plus size={14} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 border-l border-gray-200">
                      <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded text-xs font-medium">{variant.platform}</span>
                    </td>
                    <td className="p-4 border-l border-gray-200">
                      <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded text-xs font-medium">{variant.adType}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-[600px] max-w-full overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Publish variants</h2>
              <button onClick={() => setIsPublishModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Platform Tabs */}
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-green-500 bg-green-50 text-green-700 font-medium whitespace-nowrap">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</div>
                  <span>CM360</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <span className="w-4 h-4 bg-gray-800 rounded-sm"></span>
                  <span>Amazon</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <span className="text-purple-600 font-bold">Y!</span>
                  <span>Yahoo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <span className="text-blue-500 font-bold">T</span>
                  <span>TradeDesk</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <span className="text-red-600 font-bold">▶</span>
                  <span>Youtube</span>
                </button>
              </div>

              {/* CM360 Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                    <span className="font-medium text-gray-900">CM360</span>
                    <span className="text-gray-500 flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded">
                      <AlertCircle size={14} />
                      <span>Profile has not been connected</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsPublishModalOpen(false);
                      setIsStudioModalOpen(true);
                    }}
                    className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Connect Studio profile</span>
                  </button>
                </div>
                
                <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-white">
                  <input type="checkbox" className="rounded border-gray-300 w-4 h-4 text-[#8b5cf6] focus:ring-[#8b5cf6] cursor-pointer" />
                  <span className="text-gray-700">Standard</span>
                </div>
                
                <div className="p-4 flex items-center justify-between bg-[#8b5cf6]/5">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={isRichMediaSelected}
                      onChange={(e) => setIsRichMediaSelected(e.target.checked)}
                      className="rounded border-gray-300 w-4 h-4 text-[#8b5cf6] focus:ring-[#8b5cf6] cursor-pointer" 
                    />
                    <span className="font-medium text-[#8b5cf6]">Rich Media</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm bg-white border border-gray-200 px-2 py-1 rounded">
                    <AlertCircle size={14} />
                    <span>Manual</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <button 
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-100 transition-colors bg-white"
              >
                Cancel
              </button>
              <button 
                onClick={handlePublishConfirm}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                Publish ({selectedVariants.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Studio Profile Modal */}
      {isStudioModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-[700px] max-w-full overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Connect Google Studio profile</h2>
                <p className="text-sm text-gray-500 mt-1">Set up a profile to publish from this Producer</p>
              </div>
              <button onClick={() => setIsStudioModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Stepper */}
              <div className="flex items-center mb-8">
                <div className="flex items-center text-green-600 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                    <Check size={14} />
                  </div>
                  Mapping elements
                </div>
                <div className="h-px bg-gray-300 w-16 mx-4"></div>
                <div className="flex items-center text-[#8b5cf6] font-medium">
                  <div className="w-6 h-6 rounded-full border-2 border-[#8b5cf6] flex items-center justify-center mr-2">
                    2
                  </div>
                  Rules definition
                </div>
              </div>

              {/* Rules Area */}
              {!showRules ? (
                <button 
                  onClick={() => setShowRules(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                  <span>Create new rule</span>
                </button>
              ) : (
                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div 
                      key={rule.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center justify-between p-4 border rounded-lg bg-white cursor-grab active:cursor-grabbing transition-all
                        ${draggedIdx === index ? 'opacity-50 shadow-md border-[#8b5cf6]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <ChevronDown size={18} className="text-gray-400" />
                        <span className="font-medium text-gray-700">{rule.text}</span>
                      </div>
                      <button className="text-red-400 hover:text-red-600 p-1 transition-colors border border-red-100 rounded hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {/* Fallback Rule - Fixed at bottom */}
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 border-gray-200">
                    <div className="flex items-center space-x-3">
                      <ChevronDown size={18} className="text-gray-300" />
                      <span className="font-medium text-gray-500">Fallback Rule</span>
                    </div>
                    <button className="text-gray-300 p-1 border border-gray-100 rounded cursor-not-allowed">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 mt-4 transition-colors">
                    <Plus size={16} />
                    <span>Add new rule</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <button 
                onClick={() => setIsStudioModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-100 transition-colors bg-white"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    console.log("Connecting Studio Profile with rules:", [...rules.map(r => r.text), "Fallback Rule"]);
                    setIsStudioModalOpen(false);
                  }}
                  className="px-4 py-2 bg-[#8b5cf6] text-white rounded-md font-medium hover:bg-[#7c3aed] transition-colors"
                >
                  Connect Studio Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
