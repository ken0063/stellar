declare module 'satellite.js' {
    export interface SatRec {
        // Only adding fields we might need or generally known ones, 
        // essentially it's an opaque object for most use cases but having a type name helps.
        satnum: string;
        epochyr: number;
        epochdays: number;
        jdsatepoch: number;
        ndot: number;
        nddot: number;
        bstar: number;
        inclo: number;
        nodeo: number;
        ecco: number;
        argpo: number;
        mo: number;
        no: number;
    }

    export interface EciVec3 {
        x: number;
        y: number;
        z: number;
    }

    export interface EcfVec3 {
        x: number;
        y: number;
        z: number;
    }

    export interface Geodetic {
        longitude: number;
        latitude: number;
        height: number;
    }

    export interface LookAngles {
        azimuth: number;
        elevation: number;
        rangeSat: number;
    }

    export interface PropagateResult {
        position: EciVec3 | boolean; // boolean false on error
        velocity: EciVec3 | boolean;
        positionEci?: EciVec3; // satellite.js sometimes attaches this alias
        velocityEci?: EciVec3;
    }

    // Explicit function signatures
    export function twoline2satrec(line1: string, line2: string): SatRec;
    
    // Propagate returns a result object that might contain position/velocity or false
    export function propagate(satrec: SatRec, date: Date): PropagateResult;
    
    export function gstime(date: Date): number;
    
    export function eciToGeodetic(positionEci: EciVec3, gmst: number): Geodetic;
    
    export function degreesLat(radians: number): number;
    export function degreesLong(radians: number): number;
    
    export function eciToEcf(positionEci: EciVec3, gmst: number): EcfVec3;
    
    export function ecfToLookAngles(observerGd: Geodetic, positionEcf: EcfVec3): LookAngles;

    export function degreesToRadians(degrees: number): number;
    export function radiansToDegrees(radians: number): number;
}
