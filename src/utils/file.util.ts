import qrcode from 'qrcode';

export default class FileUtil {
    async generateQRImage (data: string, type = 'png'): Promise<string> {
        return (await qrcode.toDataURL(data)).split(',')[1].trim();
    }
}