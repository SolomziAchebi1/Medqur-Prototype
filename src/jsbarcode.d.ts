declare module "jsbarcode" {
  export default function JsBarcode(
    element: SVGSVGElement | HTMLCanvasElement | string,
    data: string,
    options?: Record<string, unknown>,
  ): void;
}
