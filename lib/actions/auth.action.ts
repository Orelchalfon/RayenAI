'use server'
const WEEK = 60 * 60 * 24 * 7; // 1 day in milliseconds
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
export const setSessionCookie = async (idToken: string) => {
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(
        idToken, {
        expiresIn: WEEK * 1000
    }
    )
    cookieStore.set('session', sessionCookie, {

        httpOnly: true,
        maxAge: WEEK,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        sameSite: "lax"
    })
}
export const signUp = async (params: SignUpParams) => {
    const { uid, name, email } = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get()
        if (userRecord.exists) {
            return {
                success: false, message: 'User already exists'
            }
        }
        await db.collection('users').doc(uid).set({
            name, email
        })

    } catch (error: any) {
        console.error(error.message);

        if (error.code === 'auth/email-already-exists')
            return {
                success: false, message: 'Email already exists'
            }
        return {
            success: false,
            message: 'Failed to create an account'
        }
    }

}

export const signIn = async (params: SignInParams) => {
    const { email, idToken } = params;
    try {

        const userRecord = await auth.getUserByEmail(email)
        if (!userRecord) {
            return {
                success: false, message: 'User does not exist'
            }
        }

        await setSessionCookie(idToken)
        // const user = await db.collection('users').doc(userRecord.uid).get()
        // if (!user.exists) {
        //     return {
        //         success: false, message: 'User does not exist'
        //     }
        // }
        // const userData = user.data()
        return {
            success: true,
            message: 'User signed in successfully',

        }
    } catch (error: any) {

        console.error(error.message);

        return {
            success: false,
            message: 'Failed to sign in user'
        }
    }
}

export const getCurrentUser = async (): Promise<User | null> => {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value
    if (!sessionCookie) return null
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true)

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get()

        if (!userRecord.exists) return null
        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User
    } catch (error: any) {
        console.error(error.message);
        return null
    }
}

export const signOut = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export const isAuthenticated = async () => !!await getCurrentUser()
