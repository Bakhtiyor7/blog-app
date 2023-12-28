import express from 'express';

declare module 'express-session' {
    interface Session {
        member?: any; // Adjust the type according to your actual member type
    }
}