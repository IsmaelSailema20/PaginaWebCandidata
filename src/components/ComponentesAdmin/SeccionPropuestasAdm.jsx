import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import ModalPropuestas from '../ModalPropuestas';

function SeccionPropuestasAdm() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Propuestas
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SeccionPropuestasAdm;


