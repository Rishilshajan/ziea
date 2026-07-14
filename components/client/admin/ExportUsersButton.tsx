"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MdOutlinePictureAsPdf, MdOutlineTableChart } from 'react-icons/md';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface ExportUsersButtonProps {
  users: any[];
  adminName: string;
}

export function ExportUsersButton({ users, adminName }: ExportUsersButtonProps) {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const doc = new jsPDF();

      const dateStr = new Date().toLocaleDateString();
      const timeStr = new Date().toLocaleTimeString();

      try {
        const logoData = await getBase64ImageFromURL(window.location.origin + '/Ziea_Logo.png');
        doc.addImage(logoData, 'PNG', 14, 10, 60, 30); // x, y, width, height (increased size)
      } catch (e) {
        // Fallback if logo fails
        doc.setFontSize(22);
        doc.text("ZIEA", 14, 25);
      }

      // Title Centered
      doc.setFontSize(18);
      doc.text("Customers List", 105, 50, { align: 'center' });

      // Horizontal Line
      doc.setDrawColor(214, 195, 179); // #d6c3b3
      doc.line(14, 55, 196, 55);

      // Metadata Left Aligned
      doc.setFontSize(10);
      doc.text(`Date: ${dateStr}`, 14, 65);
      doc.text(`Time: ${timeStr}`, 14, 71);
      doc.text(`Exported By: ${adminName}`, 14, 77);

      const tableData = users.map(user => [
        `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown',
        user.email || '-',
        user.phone || '-',
        user.role || 'user'
      ]);

      autoTable(doc, {
        startY: 85,
        head: [['Name', 'Email', 'Phone', 'Role']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [44, 56, 41] } // #2C3829
      });

      doc.save(`ZIEA_Customers_${dateStr.replace(/\//g, '-')}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExportingExcel(true);
    try {
      const dateStr = new Date().toLocaleDateString();
      const timeStr = new Date().toLocaleTimeString();

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Customers');

      // Add metadata rows
      sheet.addRow(['ZIEA - Customers List']);
      sheet.addRow([`Date: ${dateStr}`]);
      sheet.addRow([`Time: ${timeStr}`]);
      sheet.addRow([`Exported By: ${adminName}`]);
      sheet.addRow([]); // empty row

      sheet.getRow(1).font = { bold: true, size: 14 };

      const headerRow = sheet.addRow(['Name', 'Email', 'Phone', 'Role']);
      headerRow.font = { bold: true };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF2C3829' }
      };
      headerRow.eachCell((cell) => {
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      });

      users.forEach(user => {
        sheet.addRow([
          `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown',
          user.email || '-',
          user.phone || '-',
          user.role || 'user'
        ]);
      });

      sheet.columns = [
        { width: 25 },
        { width: 35 },
        { width: 20 },
        { width: 15 }
      ];

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `ZIEA_Customers_${dateStr.replace(/\//g, '-')}.xlsx`);
    } catch (error) {
      console.error("Excel Export Error:", error);
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
      <Button
        variant="auth-social"
        onClick={handleExportPDF}
        disabled={isExportingPDF}
        className="w-full md:!w-auto !py-3 !text-sm px-5 gap-2"
      >
        {isExportingPDF ? 'Exporting...' : 'Export PDF'}
      </Button>
      <Button
        variant="auth-primary"
        onClick={handleExportExcel}
        disabled={isExportingExcel}
        className="w-full md:!w-auto !py-3 !text-sm px-5 gap-2"
      >
        {isExportingExcel ? 'Exporting...' : 'Export Excel'}
      </Button>
    </div>
  );
}
