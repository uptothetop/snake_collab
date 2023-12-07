export const scale = 10;

export function drawCell(context, x, y) {
    context.fillStyle = '#FFFFFF';
    context.fillRect(x * scale, y * scale, scale, scale);
}
