import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Code2 } from 'lucide-react';

interface JsonPreviewProps {
  data: any;
  hasData: boolean;
}

export function JsonPreview({ data, hasData }: JsonPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-[100px] right-4 z-40">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="bg-[#26C4B5] hover:bg-[#1FA99B] text-white shadow-lg rounded-full w-12 h-12">
            <Code2 className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="bg-white border-[#E0D8C8] h-[75vh] rounded-t-[20px]">
          <SheetHeader className="border-b border-[#E0D8C8] pb-4">
            <SheetTitle className="text-[#231F20]">API Payload Preview</SheetTitle>
            <p className="text-[#8A8378] text-sm">
              Live preview of backend payload
            </p>
          </SheetHeader>
          <div className="mt-4 overflow-auto h-[calc(75vh-100px)]">
            {hasData ? (
              <pre className="bg-[#231F20] border border-gray-700 rounded-[14px] p-4 overflow-auto text-xs text-gray-100 font-mono">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <div className="bg-[#EFE8DA] border border-[#E0D8C8] rounded-[14px] p-8 text-center">
                <Code2 className="w-10 h-10 text-[#8A8378] mx-auto mb-3" />
                <p className="text-[#8A8378] text-sm">
                  Save a treatment to see the payload
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
