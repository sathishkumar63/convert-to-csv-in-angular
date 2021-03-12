import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class AppService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  downloadCSVFile(data: any[]) {
    if (data && data.length > 0) {
      const csvData = this.convertToCSV(data);
      const blob = new Blob(["\ufeff" + csvData], {
        type: "text/csv;charset=utf-8;"
      });
      this.openDownload(blob);
    }
  }

  openDownload(csvData: Blob) {
    const a = this.document.createElement("a");
    const objectUrl = URL.createObjectURL(csvData);
    a.href = objectUrl;
    a.download = this.generateFileName();
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

  generateFileName(prefix = "failed_group_enrollments", fileExtension = "csv") {
    const d = new Date();
    const dateStr = d
      .toDateString()
      .toLowerCase()
      .replace(/\s/g, "_");
    const name = `${prefix}_${dateStr}.${fileExtension}`;
    return name;
  }

  convertToCSV(data: any[]) {
    if (data && data.length > 0) {
      // in failedEnrollments array look for the object with most keys to use as header
      const header = data
        .map(x => Object.keys(x))
        .reduce((acc, cur) => (acc.length > cur.length ? acc : cur), []);
      const values = data.map(row => header.map(name => row[name]).join(","));
      const csv = [header.join(","), ...values].join("\r\n");
      return csv;
    }
  }
}
