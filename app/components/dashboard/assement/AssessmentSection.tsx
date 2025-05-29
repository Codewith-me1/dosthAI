import React from "react";

const assessmentTypes = [
  "Motor Imitation",
  "Tacting",
  "Listener Responding",
  "Intraverbal",
];

const AssessmentSection: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-purple-400 mb-1">
        Create Cognition Assessments
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Create cognition assessment supporting cards for all levels and types
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        {assessmentTypes.map((type) => (
          <span
            key={type}
            className="px-4 py-2 bg-yellow-100 text-gray-800 rounded-full text-sm font-medium shadow-sm"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AssessmentSection;
