type User = {
    id: string,
    email: string,
    name: string,
    business_name: string,
    userType: string,
    stripeAccountId: string,
    onboardingStatus: string,
    createAt: string,
    updatedAt?: string
}

export default User