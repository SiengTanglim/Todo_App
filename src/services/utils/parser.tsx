export function htmlToText(html: string): string {
    return html.replace(/<[^>]+>/g, '').replace('&nbsp;', '');
}