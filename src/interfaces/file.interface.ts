export interface UploadFile {
	filename: string;
	contentType: string;
	metadata: {
		userId: string;
	}
}